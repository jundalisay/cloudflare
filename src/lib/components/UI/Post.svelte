<script lang="ts">
  import { formatDistanceToNow } from 'date-fns';
 
 export type User = {
  id: string;
  username: string;
  photo: string;
  date_created: Date;
};

export type Post = {
  id: string;
  content: string;
  user_id: string;
  date_created: Date;
};

export type PostWithUser = Post & {
  user: User;
};

  const props = $props<{
    post: PostWithUser;
  }>();
  
  // Format the post creation time (relative to now)
  $derived(formattedTime = formatDistanceToNow(
    new Date(props.post.createdAt), 
    { addSuffix: true }
  ));
</script>



<div class="bg-white rounded-lg shadow p-4 mb-4 hover:shadow-md transition-shadow duration-200">
  <div class="flex">
    <!-- User Avatar -->
    <div class="flex-shrink-0 mr-4">
      <a href={`/users/${props.post.user.id}`} class="block">
        <img 
          src={props.post.user.avatarUrl} 
          alt={props.post.user.name}
          class="h-12 w-12 rounded-full object-cover border-2 border-gray-200"
        />
      </a>
    </div>
    
    <!-- Post Content -->
    <div class="flex-1 min-w-0">
      <div class="flex items-baseline justify-between mb-1">
        <div>
          <a 
            href={`/users/${props.post.user.id}`}
            class="font-medium text-gray-900 hover:text-blue-600 transition-colors duration-150"
          >
            {props.post.user.name}
          </a>
          <span class="text-gray-500 text-sm ml-1">@{props.post.user.username}</span>
        </div>
        <span class="text-xs text-gray-500">{formattedTime}</span>
      </div>
      
      <div class="text-gray-800 whitespace-pre-line break-words">
        {props.post.content}
      </div>
      
      <!-- Post Actions -->
      <div class="flex mt-3 pt-2 border-t border-gray-100">
        <button class="text-gray-500 hover:text-blue-600 transition-colors duration-150 mr-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Reply
        </button>
        <button class="text-gray-500 hover:text-red-600 transition-colors duration-150 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          Like
        </button>
      </div>
    </div>
  </div>
</div>
