# == Schema Information
#
# Table name: companies
#
#  id          :integer          not null, primary key
#  name        :string(255)      not null
#  description :text(65535)      not null
#  start_date  :date             not null
#  end_date    :date
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Company < ActiveRecord::Base
  has_many :projects, -> { order(date: :asc) }, dependent: :destroy

  validates :name, presence: true
  validates :end_date, presence: true
  validates :start_date, presence: true

  validate :end_date_after_start_date,
    if: proc { end_date.present? }

  private

  def end_date_after_start_date
    if end_date <= start_date
      errors.add(:company, 'The end date must be after the start date.')
      return false
    end
  end
end
