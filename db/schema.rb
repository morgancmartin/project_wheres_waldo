# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160920173505) do

  create_table "characters", force: :cascade do |t|
    t.string   "name"
    t.integer  "x"
    t.integer  "y"
    t.integer  "radius"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "picture_id"
    t.index ["picture_id"], name: "index_characters_on_picture_id"
  end

  create_table "pictures", force: :cascade do |t|
    t.string   "url"
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tags", force: :cascade do |t|
    t.integer  "character_id"
    t.integer  "x"
    t.integer  "y"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.integer  "picture_id"
    t.index ["character_id"], name: "index_tags_on_character_id"
    t.index ["picture_id"], name: "index_tags_on_picture_id"
  end

end
