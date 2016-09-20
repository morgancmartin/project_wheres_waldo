class TagsController < ApplicationController

  def index
    @tags = Tag.all
  end

  def create
    @character = Character.find_by(:name, tag_params[:name])
    @tag = Tag.new(x: tag_params[:x], y: tag_params[:y])
    @tag.character = @character if @character
    if @tag.save
      respond_to do |format|
        format.json { render json: @tag, status: 201 }
      end
    else
      respond_to do |format|
        format.json { render nothing: true, status: 400 }
      end
    end
  end



  private

    def tag_params
      params.require(:tag).permit(:x, :y, :name)
    end
end
