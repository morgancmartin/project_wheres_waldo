class TagsController < ApplicationController

  def index
    @tags = Tag.all
    respond_to do |format|
      format.html
      format.json { render json: @tags, status: 200 }
    end
  end

  def create
    @character = Character.find_by_name(tag_params[:name])
    @tag = Tag.new(x: tag_params[:x], y: tag_params[:y])
    @tag.character = @character

    if @tag.save
      respond_to do |format|
        format.json { render json: @tag, status: 201 }
      end
    else
      respond_to do |format|
        format.json { render json: { error: @tag.errors.full_messages.join(",") }, status: 422 }
      end
    end
  end



  private

    def tag_params
      params.require(:tag).permit(:x, :y, :name)
    end
end
