require "active_record"
require "sqlite3"

ActiveRecord::Base.establish_connection(
  adapter: 'sqlite3',
  database: 'db.sqlite3'
)

class Tag < ActiveRecord::Base
  has_many :items
end

class Item < ActiveRecord::Base
  belongs_to :tag
  has_many :likes, dependent: :destroy
  has_many :liking_users, through: :likes, source: :user
end

class User < ActiveRecord::Base
  has_many :likes, dependent: :destroy
  has_many :like_items, through: :likes, source: :item
end

class Like < ActiveRecord::Base
  belongs_to :item
  belongs_to :user
end

def migration
  ActiveRecord::Migration.create_table :tags do |t|
    t.string :name
  end

  ActiveRecord::Migration.create_table :items do |t|
    t.integer :tag_id
    t.string :name
  end

  ActiveRecord::Migration.create_table :users do |t|
    t.string :name
  end

  ActiveRecord::Migration.create_table :likes do |t|
    t.integer :item_id
    t.integer :user_id
  end
end

if __FILE__ == $0
  `rm db.sqlite3`
  migration

  %w(Tom Steve Job).each { |x| User.create(name: x) }
  %w(Men Women Child).each { |x| Tag.create(name: x) }
  Tag.all.each do |tag|
    %w(shirts).each { |x| Item.create(name: x, tag: tag)}
  end

  item = Item.first
  User.first(2).each do |user|
    Like.create(user: user, item: item)
  end
end
