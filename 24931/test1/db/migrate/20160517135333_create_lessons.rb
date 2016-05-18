class CreateLessons < ActiveRecord::Migration
  def change
    create_table :lessons do |t|
      t.references :course, index: true

      t.timestamps null: false
    end
    add_foreign_key :lessons, :courses
  end
end
