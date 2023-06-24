from django.db import models
from autoslug import AutoSlugField
from django.contrib.auth.models import AbstractUser
from django.utils.crypto import get_random_string
from cloudinary.models import CloudinaryField
from cloudinary import uploader


class Profile(AbstractUser):
    ROLES = (
        ('A', 'Admin'),
        ('D', 'Developer'),
        ('U', 'User'),
        ('B', 'Blind User'),
        ('BA', 'Blind Assistant'),
    )
    photo = CloudinaryField("image", blank=True,
                            null=True, default="image/upload/v1687451576/media/profile/default.jpg")
    bg_image = CloudinaryField("image", blank=True,
                               null=True)
    bio = models.TextField(blank=True, null=True)
    api_key = models.CharField(
        max_length=40, unique=True, blank=True, null=True)
    role = models.CharField(max_length=2, choices=ROLES, default='U')

    def save(self, *args, **kwargs):
        # Generate API key if it doesn't exist
        if not self.api_key:
            self.api_key = get_random_string(length=40)

        super().save(*args, **kwargs)
        super().save(update_fields=['photo'])
        super().save(update_fields=['bg_image'])

    def __str__(self):
        return self.username


class Blog(models.Model):

    CHOICES = (
        ('Uncategorized', 'Uncategorized'),
        ('Technology', 'Technology'),
        ('Programming', 'Programming'),
        ('Business', 'Business'),
        ('Marketing', 'Marketing'),
        ('Health', 'Health'),
        ('Travel', 'Travel'),
        ('Food', 'Food'),
        ('Fashion', 'Fashion'),
        ('Sports', 'Sports'),
        ('Entertainment', 'Entertainment'),
        ('Lifestyle', 'Lifestyle'),
        ('Gaming', 'Gaming'),
        ('Music', 'Music'),
        ('Movies', 'Movies'),
        ('TV', 'TV'),
        ('Books', 'Books'),
        ('News', 'News'),
        ('Politics', 'Politics'),
        ('Science', 'Science'),
        ('Education', 'Education'),
        ('Environment', 'Environment'),
        ('History', 'History'),
        ('Art', 'Art'),
        ('Design', 'Design'),
        ('Photography', 'Photography'),
        ('Economics', 'Economics'),
        ('Finance', 'Finance'),
        ('Law', 'Law'),
        ('Religion', 'Religion'),
        ('Philosophy', 'Philosophy'),
    )

    author = models.ForeignKey(Profile, null=True, on_delete=models.SET_NULL)
    title = models.CharField(max_length=100)
    slug = AutoSlugField(populate_from='title', unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    content = models.TextField()
    image = CloudinaryField('image', null=True, blank=True,
                            default="image/upload/v1687454064/media/profile/default_post.jpg")
    category = models.CharField(
        max_length=100, default='uncategorized', choices=CHOICES)
    publish_status = models.BooleanField(default=True, choices=(
        (True, 'Published'), (False, 'Draft')))
    likes = models.ManyToManyField(
        Profile, related_name='blog_posts', blank=True)
    author_name = property(lambda self: self.author.username)
    author_photo = property(lambda self: self.author.photo.url)
    author_bio = property(lambda self: self.author.bio)
    author_email = property(lambda self: self.author.email)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

    def total_likes(self):
        return self.likes.count()

    def summary(self):
        return self.content[:100]

    def date_created(self):
        return self.created_at.strftime("%d-%b-%y, %I:%M %p")

    def date_updated(self):
        return self.updated_at.strftime("%d-%b-%y, %I:%M %p")

    def reading_time(self):
        total_words = len(self.content.split())
        reading_time = round(total_words/200)
        if reading_time == 0:
            return '<1 min read'
        return str(reading_time) + ' min read'

    def comment_count(self):
        return Comment.objects.filter(blog=self).count()

    def delete(self, *args, **kwargs):
        super().delete(*args, **kwargs)

    def save(self, *args, **kwargs):
        # Check if the image field has changed
        if self.pk:
            old_instance = Blog.objects.get(pk=self.pk)
            if self.image != old_instance.image:
                # Delete the old image from Cloudinary
                uploader.destroy(old_instance.image.public_id)

        # Save the blog instance
        super().save(*args, **kwargs)

        super().save(update_fields=['image'])

    def __str__(self):
        return self.slug


class Comment(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    body = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    username = property(lambda self: self.user.username)
    user_photo = property(lambda self: self.user.photo.url)

    def __str__(self):
        return f'Comment {self.body} by {self.user}'

    def date_format(self):
        return self.date.strftime("%d-%b-%y, %I:%M %p")
