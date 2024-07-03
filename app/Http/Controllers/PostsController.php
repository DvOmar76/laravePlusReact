<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostsController extends Controller
{
    public function index(){
        $posts = Post::with('user')->latest()->get();
        return inertia::render('Posts/index',[
            'posts'=>PostResource::collection($posts)
        ]);
    }
    public function store(PostRequest $request)
    {
        auth()->user()->posts()->create($request->validated());
        return redirect()->route('posts.index')->with('success','Post created successfully');
    }

}
