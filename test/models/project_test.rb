# == Schema Information
#
# Table name: projects
#
#  id                :integer          not null, primary key
#  name              :string(255)
#  url               :string(255)
#  description       :text(65535)
#  image_uid         :string(255)
#  published         :boolean          default(FALSE)
#  featured          :boolean          default(FALSE)
#  featured_position :integer
#  agency_id         :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#

require 'test_helper'

class ProjectTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
