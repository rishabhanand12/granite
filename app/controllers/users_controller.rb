class UsersController < ApplicationController
  def index
    users = User.all.as_json(only: %i[id name])
    render status: :ok, json: { users: users }
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render status: :ok, json: { notice: 'Account created successfully!' }
    else
      render status: :unprocessable_entity, json: { errors: @user.errors.full_messages }
    end
  end
end
