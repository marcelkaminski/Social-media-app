from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    def serialize(self):
        return {
            "username": self.username,
        }

class Post(models.Model):
    id = models.AutoField(primary_key=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey("User", on_delete=models.CASCADE, related_name="posts")
    content = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='images/', blank=True, null=True)
    likes = models.ManyToManyField("User", blank=True, related_name="post_likes")

    def serialize(self):
        if self.image:
            url = self.image.url
        else:
            url = ""
            
        return {
            "id": self.id,
            "timestamp": self.timestamp.strftime("%b %d %Y, %I:%M %p"),
            "author": self.author.username,
            "content": self.content,
            "image": url
        }