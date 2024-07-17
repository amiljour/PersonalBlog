from django.contrib import admin
from django.urls import path, include

# URL patterns for the blog_platform project
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('blog.urls')),
]