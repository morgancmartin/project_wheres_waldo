class CreateTags < ActiveRecord::Migration[5.0]
  def change
    create_table :tags do |t|
      t.string :name
      t.integer :x
      t.integer :y
      t.timestamps
    end
  end
end
