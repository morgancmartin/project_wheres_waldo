class Tag < ApplicationRecord
  belongs_to :character
  # validates_with TagValidator
end
