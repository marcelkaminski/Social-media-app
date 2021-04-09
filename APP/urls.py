from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),

    path("add", views.add_post, name="add"),
    path("search", views.get_search_view, name="search"),
    path("profile/<str:name>", views.get_profile_view, name="profile"),

    #get json of all posts
    path("posts", views.get_all_posts, name="posts"),
    #get json of search result
    path("search/<str:query>", views.get_search_result, name="search_result"),
    path("like/<int:pk>", views.like, name="like"),
    ]
