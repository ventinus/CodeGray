class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :name
      t.string :url, limit: 255
      t.text :description, limit: 65535
      t.string :image_uid, limit: 255
      t.boolean :published, default: false
      t.boolean :featured, default: false
      t.integer :featured_position

      t.references :agency, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
