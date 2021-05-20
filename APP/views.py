from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render, get_object_or_404, redirect
from django.urls import reverse
from django.contrib.auth.decorators import login_required
import json

from .models import User, Post, Comment, Profile
from .forms import PostForm, CommentForm


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user, backend='django.contrib.auth.backends.ModelBackend')
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "APP/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "APP/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "APP/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
            profile = Profile(user=user)
            profile.save()
        except IntegrityError:
            return render(request, "APP/register.html", {
                "message": "Username already taken."
            })
        login(request, user, backend='django.contrib.auth.backends.ModelBackend')
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "APP/register.html")

        
def index(request):
    return render(request, "APP/index.html")


@login_required
def add_post(request):
    if request.method == "GET":
        return render(request, "APP/add.html", {"form": PostForm})

    elif request.method == "POST":
        form = PostForm(request.POST,request.FILES)
        if form.is_valid():
            obj = form.save(commit=False)
            user = User.objects.get(username=request.user)
            obj.author = user
            obj.save()
            form = PostForm
        return redirect(f'/profile/{request.user}')


def get_posts(request, num_posts):
    upper = num_posts
    lower = upper - 3
    posts = Post.objects.all()
    posts = posts.order_by("-timestamp").all()
    posts = posts[lower:upper]
    return JsonResponse([post.serialize() for post in posts], safe=False)


def get_search_view(request):
    return render(request, "APP/search.html")


def get_search_result(request, query):
    users = list(User.objects.values_list('username', flat=True))
    result = list()
    for s in users:
        if query in s.lower():
            d = {}
            d["username"] = s
            result.append(d)
    if result:
        return JsonResponse(result, safe=False)
    else:
        return JsonResponse([{"message":"No results"}], safe=False)


def get_profile_view(request, name):
    
    user = get_object_or_404(User, username=name)
    posts = user.posts.all()
    posts = posts.order_by("-timestamp").all()

    following = Profile.objects.get(user = user).following.all()
    followers = Profile.objects.get(user = user).followers.all()

    profile = Profile.objects.get(user=user)

    return render(request, "APP/profile.html",
    {
        "user_data": user,
        "posts": posts,
        "CommentForm": CommentForm,
        "following": len(following),
        "followers": len(followers),
        "profile": profile
    })

def get_profile_posts(request, name):
    user = get_object_or_404(User, username=name)
    posts = user.posts.all()
    posts = posts.order_by("-timestamp").all()
    return JsonResponse([post.serialize() for post in posts], safe=False)


def like(request, pk):
    post = get_object_or_404(Post, id=pk)
    if request.user in post.likes.all():
        post.likes.remove(request.user)
    else:
        post.likes.add(request.user)
    return HttpResponseRedirect(request.META.get('HTTP_REFERER'))


def comment(request, pk):
    if request.method == "POST":
        form = CommentForm(request.POST)
        if form.is_valid():
            obj = form.save(commit=False)
            user = User.objects.get(username=request.user)
            obj.author = user
            obj.save()
            post = get_object_or_404(Post, id=pk)
            post.comments.add(obj)
    return HttpResponseRedirect(request.META.get('HTTP_REFERER'))


def follow(request, following_user, followed_user):
    user1 = User.objects.get(username=following_user)
    user2 = User.objects.get(username=followed_user)
    profile1 = Profile.objects.get(user=user1)
    profile2 = Profile.objects.get(user=user2)

    if profile2.user in profile1.followers.all():
        profile1.followers.remove(user2)
        profile2.following.remove(user1)
    else:
        profile1.followers.add(user2)
        profile2.following.add(user1)
    profile1.save()
    profile2.save()
    return HttpResponseRedirect(request.META.get('HTTP_REFERER'))


def feed(request):
    user = request.user
    following = Profile.objects.get(user = user).following.all()
    posts = Post.objects.all()
    posts = posts.order_by("-timestamp").all()

    print(user)
    print(following)
    print(posts)

    result = []
    for post in posts:
        if post.author in following:
            result.append(post)

    print(result)

    return render(request, 'APP/newsfeed.html', 
        {"posts":result,
        "CommentForm": CommentForm})