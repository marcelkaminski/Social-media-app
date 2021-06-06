from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    pass

class Post(models.Model):
    id = models.AutoField(primary_key=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey("User", on_delete=models.CASCADE, related_name="posts")
    content = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='images/', blank=True, null=True)
    likes = models.ManyToManyField("User", blank=True, related_name="post_likes")
    comments = models.ManyToManyField("Comment", blank=True, related_name="post_comments")

    def serialize(self):
        if self.image:
            url = self.image.url
        else:
            url = None
            
        return {
            "id": self.id,
            "timestamp": self.timestamp.strftime("%b %d %Y, %I:%M %p"),
            "author": self.author.username,
            "content": self.content,
            "image": url
        }



class Comment(models.Model):
    id = models.AutoField(primary_key=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey("User", on_delete=models.CASCADE, related_name="user_comments")
    content = models.CharField(blank=True, null=True, max_length=100)
    
    def __str__(self):
        return f"{self.author.username} {self.content}"

class Profile(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    following = models.ManyToManyField(User, blank=True, null=True, related_name="following")
    followers = models.ManyToManyField(User, blank=True, null=True, related_name="followers")
