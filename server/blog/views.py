from rest_framework import generics, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
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

# View to retrieve comments for a specific post
class CommentsList(generics.ListAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        post_id = self.kwargs['pk']
        return Comment.objects.filter(post_id=post_id)

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    @action(detail=True, methods=['get'])
    def comments(self, request, pk=None):
        post = self.get_object()
        comments = Comment.objects.filter(post=post)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)
