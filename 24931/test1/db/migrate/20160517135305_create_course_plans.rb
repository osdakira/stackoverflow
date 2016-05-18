class CreateCoursePlans < ActiveRecord::Migration
  def change
    create_table :course_plans do |t|
      t.references :course, index: true
      t.integer :position

      t.timestamps null: false
    end
    add_foreign_key :course_plans, :courses
  end
end
