# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# // waldo  x:633 y:243
# // wenda  x:435 y:226
# // wizard x:941 y:587
# // odlaw  x:450 y:415
# // woof   x:756 y:426

Character.destroy_all

character_list = ["Waldo", "Wenda", "Wizard Whitebeard", "Odlaw", "Woof"]

# Gobbling Gluttons

@picture = Picture.create(url: "ww_giant_image.jpg", name: "The Gobbling Gluttons")

@picture.characters.create(name: "Waldo", x: 633 , y: 243, radius: 10 )
@picture.characters.create(name: "Wenda", x: 435 , y: 226, radius: 10 )
@picture.characters.create(name: "Wizard", x: 941 , y: 587, radius: 10 )
@picture.characters.create(name: "Odlaw", x: 450 , y: 415, radius: 10 )
@picture.characters.create(name: "Woof", x: 756 , y: 426, radius: 10 )

