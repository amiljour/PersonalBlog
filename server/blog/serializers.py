from rest_framework import serializers
from .models import Post, Comment

# Serializer for the Comment model
class CommentSerializer(serializers.ModelSerializer):
  class Meta:
    model = Comment
    fields = ['id', 'content', 'post', 'author']

# Serializer for the Post model
class PostSerializer(serializers.ModelSerializer):
  comments = CommentSerializer(many=True, read_only=True)
  
  class Meta:
    model = Post
    fields = ['id', 'title', 'content', 'comments', 'author']