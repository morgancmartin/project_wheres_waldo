# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Character.destroy_all

character_list = ["Waldo", "Wenda", "Wizard Whitebeard", "Odlaw", "Woof"]

# Gobbling Gluttons

@picture = Picture.create(url: "ww_giant_image.jpg", name: "The Gobbling Gluttons")

#@picture.characters.build(name: "Waldo", x: , y: , radius: )


