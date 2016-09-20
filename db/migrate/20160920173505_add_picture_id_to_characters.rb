class AddPictureIdToCharacters < ActiveRecord::Migration[5.0]
  def change
    add_reference :characters, :picture, index: true
    add_reference :tags, :picture, index: true
  end
end
