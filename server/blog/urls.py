from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostListCreate, PostDetail, CommentCreate, CommentDetail, PostViewSet, CommentsList

router = DefaultRouter()
router.register(r'posts', PostViewSet)

# URL patterns for the blog application
urlpatterns = [
    # URL for listing all posts and creating a new post
    path('posts/', PostListCreate.as_view(), name='post-list-create'),

    # URL for retrieving a single post by its ID
    path('posts/<int:pk>/', PostDetail.as_view(), name='post-detail'),

    # URL for creating a new comment on a specific post
    path('posts/<int:pk>/comments/', CommentCreate.as_view(), name='comment-create'),

    # URL for retrieving comments for a specific post
    path('posts/<int:pk>/comments-list/', CommentsList.as_view(), name='comments-list'),

    # URL for retrieving, updating, and deleting a comment by its ID
    path('comments/<int:pk>/', CommentDetail.as_view(), name='comment-detail'),

    # Include the router URLs
    path('', include(router.urls)),
]