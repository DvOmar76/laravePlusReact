import toast, {Toaster} from "react-hot-toast";
import {useEffect} from "react";
import {usePage} from "@inertiajs/react";

export const Toastify = () => {
    const pageIndex= usePage();

    useEffect(() => {
        if (pageIndex?.props?.message?.body) {
            toast(pageIndex.props.message.body, {  position: "top-right", type:pageIndex.props.message.type});
        }
    }, [pageIndex.props.message]);
    return (
        <>
        <Toaster/>
        </>
    )
}
