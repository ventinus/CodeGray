# == Schema Information
#
# Table name: agencies
#
#  id          :integer          not null, primary key
#  name        :string(255)      not null
#  description :text(65535)      not null
#  start_date  :date             not null
#  end_date    :date
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'test_helper'

class AgencyTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
