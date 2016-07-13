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

require 'test_helper'

class InquiryTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
