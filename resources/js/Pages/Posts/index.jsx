import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm, router, Link, usePage} from '@inertiajs/react';
import toast from "react-hot-toast";
import {useEffect} from "react";

export default function Index({ auth, posts,testShare }) {

    const { data, setData, post, processing, errors,reset ,clearErrors,progress}  = useForm('StorePost',{
        body: '',
    });
    function submit(e) {
        e.preventDefault()
        post(route('posts.store'),{
            onSuccess:()=>{
                reset('body')
            },

        }) ;
    }
    function refreshPosts(){
        router.get(route('posts.index'),{},{
            only:['posts'],
            preserveScroll:true
        })

    }
const pageIndex= usePage();
    useEffect(() => {
        if (pageIndex?.props?.notification?.msg) {
            const { msg, type } = pageIndex.message;
            toast(msg, { type:type ,  position: "bottom-center"});
        }
    }, [pageIndex.props.notification]);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">posts</h2>}
        >
            <Head title="posts">
                <meta name="description" content="posts index" />
            </Head>

            <div className="py-12">
                <p className={'p-6 text-gray-900'}>
                   test share : {testShare}
                    test notification: {pageIndex?.props?.notification?.msg}
                </p>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">posts index</div>
                        {data.body}
                        <div className="p-6 text-gray-900 space-y-6">
                            <form id={'StorePost'} name={'StorePost'} onSubmit={submit}>
                                <label htmlFor={'body'}>body</label>
                                <textarea
                                    onChange={(e) => setData('body', e.target.value)}
                                    onFocus={() => {
                                        clearErrors('body')
                                    }}
                                    name="body"
                                    id="body"
                                    rows="4"
                                    cols="4"
                                    value={data.body}
                                    className="w-full h-full"
                                />
                                {errors.body && <div className={'text-red-600'}>{errors.body}</div>}
                                <button
                                    disabled={processing}
                                    className='bg-blue-200 rounded p-1 text-center' type="submit">
                                    {processing ? "loading ..." : 'post'}

                                </button>
                            </form>
                        </div>
                        <div className={'space-y-6'}>
                            {/*<button className={'bg-black p-1 rounded text-white'} onClick={refreshPosts}>refresh</button>*/}
                            <Link hrfe={route('posts.index')} only={['posts']}>refresh</Link>
                        </div>
                        {posts.data.map((post) => (
                            <div key={post.id}>
                                <div className="p-6 text-lg font-bold">
                                    {post.user.name} ({post.created_at})
                                </div>
                                <div className="p-6 text-gray-900">{post.body}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
