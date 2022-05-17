import createArticleApi from '@/assets/js/api/article'
import createTypeApi from '@/assets/js/api/type'
import createTagApi from '@/assets/js/api/tag'
import createUserApi from '@/assets/js/api/user'
import createResourceTypeApi from '@/assets/js/api/resourceType'
import createCommentApi from '@/assets/js/api/comment'
import createFriendLinksApi from '@/assets/js/api/friend-links'
import createProjectApi from '@/assets/js/api/project'
import createMusicApi from '@/assets/js/api/music'
import createChatApi from '@/assets/js/api/chat'
import createToolsApi from '@/assets/js/api/tools'
import createCollectApi from '@/assets/js/api/collect'

export default ({ $axios }, inject) => {
  const repositories = {
    article: createArticleApi($axios)('/api/article'),
    type: createTypeApi($axios)('/api/type'),
    tag: createTagApi($axios)('/api/tag'),
    user: createUserApi($axios)('/api/user'),
    resourceType: createResourceTypeApi($axios)('/api/resourceType'),
    comment: createCommentApi($axios)('/api/comment'),
    friendLinks: createFriendLinksApi($axios)('/api/friend-links'),
    project: createProjectApi($axios)('/api/project'),
    music: createMusicApi($axios)('/api/music'),
    chat: createChatApi($axios)('/api/chat'),
    tools: createToolsApi($axios)('/api/tools'),
    collect: createCollectApi($axios)('/api/collect'),
  }

  inject('API', repositories)
}
