from django.http import JsonResponse
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from .models import Book
from .serializers import BookSerializer
from rest_framework.decorators import api_view
@api_view(['GET','POST','DELETE','PUT'])
def book_list(request):
    if request.method=='GET':
        book=Book.objects.all()
        serializer=BookSerializer(book,many=True)
        return JsonResponse(serializer.data, safe=False)
    if request.method=='POST':
        serializer=BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','DELETE','PUT'])
def book_detail(request,id):
    try:
        book=Book.objects.get(id=id)
    except Book.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer=BookSerializer(book)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer=BookSerializer(book,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def hello(request):
    return JsonResponse({"data": "Hello, world!"})