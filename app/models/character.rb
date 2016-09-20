class Character < ApplicationRecord
  belongs_to :picture
  has_many :tags
end
