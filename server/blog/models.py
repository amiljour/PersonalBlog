from django.db import models

# Post model with title, content, created_at, and updated_at fields
class Post(models.Model):
  title = models.CharField(max_length=200)
  content = models.TextField()
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.title

# Comment model with post, content, created_at, and updated_at fields
class Comment(models.Model):
  post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
  content = models.TextField()
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.content[:20]