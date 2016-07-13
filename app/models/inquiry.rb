# == Schema Information
#
# Table name: inquiries
#
#  id         :integer          not null, primary key
#  email      :string(255)
#  name       :string(255)
#  message    :text(65535)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Inquiry < ActiveRecord::Base
  validates :name, presence: true
  validates :email, presence: true, format: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i
  validates :message, presence: true
end
