from django.urls import path

from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),

    path("add", views.add_post, name="add"),
    path("search", views.get_search_view, name="search"),
    path("profile/<str:name>", views.get_profile_view, name="profile"),

    #get json of posts
    path("posts/<int:num_posts>", views.get_posts, name="get_posts"),
    #get json of profile posts
    path("profileposts/<str:name>", views.get_profile_posts, name="get_profile_posts"),
    #get json of search result
    path("search/<str:query>", views.get_search_result, name="search_result"),
    path("like/<int:pk>", views.like, name="like"),
    ]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
