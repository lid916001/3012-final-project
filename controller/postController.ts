import * as db from "../fake-db";

// Make calls to your db from this file!
async function getPosts(n = 5, sub?: string) {
  const posts = (db as any).getPosts(n, sub);
  return posts.map((post: any) => (db as any).decoratePost(post));
}

function getSubs() {
  return (db as any).getSubs();
}

function getPost(id: number) {
  return (db as any).getPost(id);
}

function addPost(title: string, link: string, creator: number, description: string, subgroup: string) {
  return (db as any).addPost(title, link, creator, description, subgroup);
}

function editPost(postId: number, changes: any) {
  return (db as any).editPost(postId, changes);
}

function deletePost(postId: number) {
  return (db as any).deletePost(postId);
}

function addComment(postId: number, creator: number, description: string) {
  return (db as any).addComment(postId, creator, description);
}

function setVote(postId: number, userId: number, value: number) {
  return (db as any).setVote(postId, userId, value);
}

export { getPosts, getSubs, getPost, addPost, editPost, deletePost, addComment, setVote };
