class CreateBookmarks < ActiveRecord::Migration
  def change
    create_table :bookmarks do |t|
      t.references :lesson, index: true

      t.timestamps null: false
    end
    add_foreign_key :bookmarks, :lessons
  end
end
