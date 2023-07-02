from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from .models import Blog, Comment, Profile
from .serializers import BlogSerializer, CommentSerializer, ProfileSerializer, CommentCreateSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.authtoken.serializers import AuthTokenSerializer

from django.http import HttpResponseBadRequest, FileResponse
from django.core.files.base import ContentFile
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q

from braille_transcriptor.transcriptor import BrailleTranscriptor
from braille_transcriptor.strategy_factory import strategies_dict
from braille_transcriptor.braille_alphabets import Dictionary, transcript_options, translate_options, search_options
import requests
import os

# from dotenv import load_dotenv
# Load environment variables from .env file
# load_dotenv()

# strategies = {
#     "en": {"strate": strategies.EglishStrategy, 'lang': "eng", 'dictionary': Dictionary.English.value},
#     "fr": {"strate": strategies.FrenchStrategy, 'lang': "fra", 'dictionary': Dictionary.French.value},
#     "ar": {"strate": strategies.ArabicStrategy, 'lang': "ara", 'dictionary': Dictionary.Arabic.value},
#     # add strategies here
# }

# Validate API Key


# def validate_api_key(api_key):
#     # Check if the api_key is valid and matches your expected value
#     # if api_key != os.environ.get("ENV_API_KEY"):
#     #     return Response({'detail': 'Invalid API key'}, status=status.HTTP_403_FORBIDDEN)
#     pass

from django.core.exceptions import ObjectDoesNotExist
from rest_framework.exceptions import PermissionDenied
from .models import Profile


def validate_api_key(api_key):
    try:
        # Check if the API key exists in the database
        Profile.objects.get(api_key=api_key)
    except ObjectDoesNotExist:
        raise PermissionDenied("Invalid API key")


@api_view(['POST'])
def transcript(request):
    text = request.data.get('text')
    source = request.data.get('source')
    target = request.data.get('target')
    key = request.data.get('key', '')

    if source == "auto" or target == "auto":
        return Response(status=status.HTTP_204_NO_CONTENT)

    try:
        validate_api_key(key)
    except PermissionDenied:
        return Response({'detail': 'Invalid API key'}, status=status.HTTP_403_FORBIDDEN)

    transcriptor = BrailleTranscriptor(text, source, target)
    result = transcriptor.get_results()
    return Response({'result': result})


@api_view(['POST'])
def translate(request):
    text = request.data.get('text')
    source_lang = request.data.get('source_lang')
    source_grade = request.data.get('source_grade')
    target_lang = request.data.get('target_lang')
    target_grade = request.data.get('target_grade')
    key = request.data.get('key', '')

    try:
        validate_api_key(key)
    except PermissionDenied:
        return Response({'detail': 'Invalid API key'}, status=status.HTTP_403_FORBIDDEN)

    transcriptor = BrailleTranscriptor(text, source_grade, source_lang)
    result_text = transcriptor.get_results()

    url = "https://api.mymemory.translated.net/get"
    params = {"q": result_text, "langpair": f"{source_lang}|{target_lang}"}

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
    except requests.exceptions.RequestException:
        return Response({'result': result_text})

    translation = response.json()["responseData"]["translatedText"]

    transcriptor = BrailleTranscriptor(translation, target_lang, target_grade)
    result = transcriptor.get_results()
    return Response({'result': result})


@api_view(['POST'])
def download_file(request):
    braille = request.data.get('braille')
    key = request.data.get('key', '')

    try:
        validate_api_key(key)
    except PermissionDenied:
        return Response({'detail': 'Invalid API key'}, status=status.HTTP_403_FORBIDDEN)

    file_contents = braille.encode('utf-8')  # Encode the string to bytes
    file_data = ContentFile(file_contents)
    response = FileResponse(file_data, content_type='text/plain')
    response['Content-Disposition'] = 'attachment; filename=braille.brf'
    return response


@api_view(['GET'])
def get_transcribe_options(request):
    key = request.query_params.get('key', '')

    try:
        validate_api_key(key)
    except PermissionDenied:
        return Response({'detail': 'Invalid API key'}, status=status.HTTP_403_FORBIDDEN)

    return Response(transcript_options)


@api_view(['GET'])
def get_translate_options(request):
    key = request.query_params.get('key', '')

    try:
        validate_api_key(key)
    except PermissionDenied:
        return Response({'detail': 'Invalid API key'}, status=status.HTTP_403_FORBIDDEN)

    return Response(translate_options)


@api_view(['GET'])
def get_contraction_list(request):
    lang = request.query_params.get('lang', '')
    key = request.query_params.get('key', '')

    try:
        validate_api_key(key)
    except PermissionDenied:
        return Response({'detail': 'Invalid API key'}, status=status.HTTP_403_FORBIDDEN)

    if not any(option["code"] == lang for option in transcript_options):
        return Response({'detail': 'Enter a valid language (en, ar, fr)'}, status=status.HTTP_403_FORBIDDEN)

    dictt = strategies_dict[lang]['dictionary']
    contractions = []
    contractionslist = dictt.grade2_map['standalone'] | dictt.grade2_map['group_sign']

    for item in dictt.grade2_map['standalone']:
        braille = BrailleTranscriptor(
            contractionslist[item], lang, int("1")).get_results()
        contractions.append({
            "word": item,
            "contraction": contractionslist[item],
            "braille": braille
        })

    return Response(contractions)


@api_view(['GET'])
def get_search_options(request):
    key = request.query_params.get('key', '')

    try:
        validate_api_key(key)
    except PermissionDenied:
        return Response({'detail': 'Invalid API key'}, status=status.HTTP_403_FORBIDDEN)

    return Response(search_options)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getBlogs(request):
    category = request.GET.get('category', None)
    if category is not None:
        blogs = Blog.objects.filter(category=category)
        serializer = BlogSerializer(blogs, many=True)
        return Response(serializer.data)
    else:
        blogs = Blog.objects.all()
        serializer = BlogSerializer(blogs, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def getBlog(request, pk):
    blog = Blog.objects.get(pk=pk)
    blogSerializer = BlogSerializer(blog, many=False)
    return Response(blogSerializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyBlogs(request):
    user = request.user
    blogs = Blog.objects.filter(author=user)
    serializer = BlogSerializer(blogs, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createBlog(request):
    data = request.data
    print(data)
    user = Profile.objects.get(id=data['author'])
    serializer = BlogSerializer(data=data)
    if serializer.is_valid():
        serializer.save(author=user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateBlog(request, pk):
    data = request.data
    blog = Blog.objects.get(pk=pk)
    serializer = BlogSerializer(instance=blog, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteBlog(request, pk):
    blog = Blog.objects.get(pk=pk)
    blog.delete()
    return Response('Item successfully deleted!', status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def getComments(request, pk):
    comments = Comment.objects.filter(blog=pk)
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createComment(request):
    data = request.data
    blog = Blog.objects.get(id=data['blog'])
    serializer = CommentCreateSerializer(data=data)
    if serializer.is_valid():
        serializer.save(blog=blog)
        comment = Comment.objects.latest('id')
        commentSerializer = CommentSerializer(comment, many=False)
        return Response(commentSerializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteComment(request, pk):
    comment = Comment.objects.get(pk=pk)

    # Check if the comment belongs to the authenticated user
    if comment.user != request.user:
        return Response('You do not have permission to delete this comment', status=status.HTTP_403_FORBIDDEN)

    comment.delete()
    return Response('Comment successfully deleted!', status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def registerUser(request):
    data = request.data
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    photo = data.get('photo')
    bio = data.get('bio')
    role = data.get('role', 'U')

    existing_user = Profile.objects.filter(
        Q(username=username) | Q(email=email)).first()
    if existing_user:
        message = {'message': 'User with this username or email already exists'}
        return Response(message, status=status.HTTP_409_CONFLICT)

    try:
        user = Profile.objects.create_user(
            username=username,
            email=email,
            password=password,
            photo=photo,
            bio=bio
        )

        # Generate and assign API key
        # token, _ = Token.objects.get_or_create(user=user)
        # api_key = token.key
        # user.api_key = api_key
        user.save()
        serializer = ProfileSerializer(user, many=False)
        return Response(serializer.data)

    except Exception:
        error_message = "An internal server error occurred. Please try again later."
        return Response({"error": error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def getCategory(request):
    return Response([category[1] for category in Blog.CHOICES])


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addLike(request, pk):
    blog = Blog.objects.get(pk=pk)
    blog.likes.add(request.data['user'])
    blog.save()
    serializer = BlogSerializer(blog, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def removeLike(request, pk):
    blog = Blog.objects.get(pk=pk)
    blog.likes.remove(request.data['user'])
    blog.save()
    serializer = BlogSerializer(blog, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getProfile(request, pk):
    user = Profile.objects.get(pk=pk)
    serializer = ProfileSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateProfile(request, pk):
    try:
        profile = Profile.objects.get(pk=pk)
    except ObjectDoesNotExist:
        return Response({'detail': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)

    # Check if the authenticated user is the owner of the profile
    if request.user != profile:
        return Response({'detail': 'You do not have permission to update this profile'}, status=status.HTTP_403_FORBIDDEN)

    serializer = ProfileSerializer(profile, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getUsers(request):
    users = Profile.objects.all()
    serializer = ProfileSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getUser(request, pk):
    try:
        user = Profile.objects.get(pk=pk)
        serializer = ProfileSerializer(user, many=False)
        return Response(serializer.data)
    except ObjectDoesNotExist:
        return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
