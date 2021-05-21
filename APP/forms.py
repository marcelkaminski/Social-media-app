from django import forms

from .models import Post, Comment


class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['content', 'image']


class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ['content']


class UpdatePostForm(forms.ModelForm):

    class Meta:
        model = Post
        fields = ['content', 'image']

    def save(self, commit=True):
        post = self.instance
        post.content = self.cleaned_data['content']
        
        if self.cleaned_data['image']:
            post.image = self.cleaned_data['image'] 

        if commit:
            post.save()
        return post
