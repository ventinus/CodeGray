class CreateCompanies < ActiveRecord::Migration
  def change
    create_table :companies do |t|
      t.string :name,       null: false
      t.text :description,  null: false
      t.date :start_date,   null: false
      t.date :end_date

      t.timestamps null: false
    end
  end
end
