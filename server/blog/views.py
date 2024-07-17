from rest_framework import generics
from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer

# View to list all posts and create a new post
class PostListCreate(generics.ListCreateAPIView):
  queryset = Post.objects.all()
  serializer_class = PostSerializer

# View to retrieve, update, and delete a post by its id
class PostDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = Post.objects.all()
  serializer_class = PostSerializer

# View to create a new comment for a post
class CommentCreate(generics.CreateAPIView):
  queryset = Comment.objects.all()
  serializer_class = CommentSerializer

  def create(self, request, *args, **kwargs):
    post_id = self.kwargs['pk']
    request.data['post'] = post_id
    return super().create(request, *args, **kwargs)

# View to retrieve, update, and delete a comment by its id
class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = Comment.objects.all()
  serializer_class = CommentSerializer