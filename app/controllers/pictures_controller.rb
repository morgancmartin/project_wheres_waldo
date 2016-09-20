class PicturesController < ApplicationController
  def show
    @picture = Picture.first
  end
end
