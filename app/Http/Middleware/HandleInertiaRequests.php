<?php

namespace App\Http\Middleware;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user= $request->user();
        $data = [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
            ],
            'testShare' => 'test123123',
            // 'success','error' this is type of message
            'message'=>collect(Arr::only($request->session()->all(),['success','error']))->mapWithKeys(
                function ($body, $key) {
                    return [
                        'type'=>$key,
                        'body'=>$body,
                    ];
                }
            ),
            'can'=>  [
                'post_create' => $user && auth()->user()->can('create', Post::class),
            ]
        ];


        return $data;
    }
}

