import { IPost } from "@/Modals/IPost";

export default interface PostModuleState {
    posts: IPost[],
    isLoadPosts: boolean,
    isPaginationOrScroll: boolean,
    selectedSort: 'title' | 'body' | '',
    sortOptions: [
        { value: "title", name: 'По названию' },
        { value: "body", name: 'По содержимому' },
    ],
    postsQuery: string,
    limitPage: number,
    currentPage: number,
    totalPage: number,
}