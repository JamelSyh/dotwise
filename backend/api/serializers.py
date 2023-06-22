from rest_framework.serializers import ModelSerializer
from .models import Blog, Comment, Profile
from django.contrib.auth.models import User
from rest_framework import serializers


class BlogSerializer(ModelSerializer):
    class Meta:
        model = Blog
        fields = [
            'id',
            'title',
            'slug',
            'date_created',
            'date_updated',
            'content',
            'image',
            'category',
            'publish_status',
            'likes',
            'total_likes',
            'summary',
            'author_name',
            'author_photo',
            'author_bio',
            'author_id',
            'author_email',
            'reading_time',
            'comment_count'
        ]


class CommentSerializer(ModelSerializer):
    photo = serializers.ReadOnlyField(source='user.photo.url')

    class Meta:
        model = Comment
        fields = [
            'id',
            'user',
            'username',
            'body',
            'date_format',
            'photo'
        ]


class CommentCreateSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = [
            'body',
            'blog',
            'user'
        ]


class ProfileSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    blog_count = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = [
            'id',
            'username',
            'photo',
            'email',
            'password',
            'bio',
            'blog_count',
            'api_key',
            'role',
        ]

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password:
            instance.set_password(password)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance

    def get_blog_count(self, obj):
        return obj.blog_posts.count()
