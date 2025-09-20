import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase, Comment } from '../lib/supabase'
import { Heart, MessageCircle } from 'lucide-react'
import UserAvatar from './UserAvatar'

interface CommentsSectionProps {
  postId: string
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    fetchComments()
  }, [postId])

  const fetchComments = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('comments')
      .select(`
        *,
        user_profile:user_profiles(username, full_name)
      `)
      .eq('post_id', postId)
      .is('parent_id', null)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erro ao carregar comentários:', error)
    } else {
      setComments(data || [])
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !newComment.trim() || newComment.length > 100) return

    setSubmitting(true)
    const { error } = await supabase
      .from('comments')
      .insert({
        post_id: postId,
        user_id: user.id,
        content: newComment.trim(),
        likes_count: 0
      })

    if (error) {
      console.error('Erro ao enviar comentário:', error)
    } else {
      setNewComment('')
      fetchComments()
    }
    setSubmitting(false)
  }

  const handleLike = async (commentId: string) => {
    if (!user) return

    // Verificar se já curtiu
    const { data: existingLike } = await supabase
      .from('comment_likes')
      .select('id')
      .eq('comment_id', commentId)
      .eq('user_id', user.id)
      .single()

    if (existingLike) {
      // Remover curtida
      await supabase
        .from('comment_likes')
        .delete()
        .eq('comment_id', commentId)
        .eq('user_id', user.id)
    } else {
      // Adicionar curtida
      await supabase
        .from('comment_likes')
        .insert({
          comment_id: commentId,
          user_id: user.id
        })
    }

    // Atualizar contagem de curtidas
    const { count } = await supabase
      .from('comment_likes')
      .select('*', { count: 'exact' })
      .eq('comment_id', commentId)

    await supabase
      .from('comments')
      .update({ likes_count: count || 0 })
      .eq('id', commentId)

    fetchComments()
  }

  if (!user) {
    return (
      <div className="bg-black border border-red-600 p-6 text-center">
        <p className="text-gray-300 mb-4">
          Faça login para comentar nas matérias
        </p>
        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded transition-colors duration-300">
          ENTRAR
        </button>
      </div>
    )
  }

  return (
    <div className="bg-black border border-red-600 p-6">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
        <MessageCircle className="mr-2" size={20} />
        Comentários ({comments.length})
      </h3>

      {/* Formulário de comentário */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex space-x-3">
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Compartilhe sua opinião... (máximo 100 caracteres)"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white rounded focus:outline-none focus:border-red-600 resize-none"
              rows={3}
              maxLength={100}
              required
            />
            <div className="text-right text-xs text-gray-400 mt-1">
              {newComment.length}/100
            </div>
          </div>
          <button
            type="submit"
            disabled={submitting || !newComment.trim() || newComment.length > 100}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed self-end"
          >
            {submitting ? 'Enviando...' : 'Comentar'}
          </button>
        </div>
      </form>

      {/* Lista de comentários */}
      {loading ? (
        <div className="text-center text-gray-400">Carregando comentários...</div>
      ) : comments.length === 0 ? (
        <div className="text-center text-gray-400">
          Seja o primeiro a comentar!
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-gray-900 border border-gray-700 p-4 rounded">
              <div className="flex items-start space-x-3 mb-3">
                <UserAvatar 
                  name={comment.user_profile?.full_name || 'Usuário'} 
                  size="md"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-semibold text-white">
                      {comment.user_profile?.full_name || 'Usuário'}
                    </span>
                    <span className="text-xs text-gray-400">
                      @{comment.user_profile?.username || 'usuario'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(comment.created_at).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-white mb-3 ml-11">{comment.content}</p>
              
              <div className="flex items-center space-x-4 ml-11">
                <button
                  onClick={() => handleLike(comment.id)}
                  className="flex items-center space-x-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Heart size={16} />
                  <span className="text-sm">{comment.likes_count}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CommentsSection
