from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("add", views.add_post, name="add"),
    path("posts", views.get_all_posts, name="posts"),

    path("search", views.search, name="search"),
    path("search/<str:query>", views.search_result, name="search_result")
]
