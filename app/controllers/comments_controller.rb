class CommentsController < ApplicationController
  before_action :load_task
  before_action :authenticate_user_using_x_auth_token

  def create
    comment = @task.comments.new(comment_params)
    comment.user = current_user
    if comment.save
      render status: :ok, json: { notice: 'Successfully added the comment to the task' }
    else
      render status: :unprocessable_entity, json: { errors: comment.errors.full_messages }
    end
  end

  private
    def load_task
      @task = Task.find(comment_params[:task_id])
    end

    def comment_params
      params.require(:comment).permit(:content, :task_id)
    end
end
