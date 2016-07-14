# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
puts ' -- Admin -- '

Administrator.create({
  first_name: 'Jon',
  last_name: 'Gray',
  email: 'jgray@canvas.is',
  password: 'password',
  confirmed_at: Time.zone.now
})

puts ' -- Companies -- '

Company.create([
  {
    name: 'Canvas Digital Agency',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus accusantium quod odio iure dolore eligendi quasi explicabo minus quis, tempore dicta molestiae eos mollitia soluta voluptatum. Iusto, tempora cumque adipisci.',
    start_date: Date.new(2015,10,19),
    end_date: Date.new(2016,10,1)
  },{
    name: 'Rokkan',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos harum, reprehenderit unde minus vitae, quod quam animi, illo laborum dignissimos sunt. Voluptate totam nihil officiis. Est et labore enim aut!',
    start_date: Date.new(2015,6,29),
    end_date: Date.new(2015,10,16)
  }, {
    name: 'CodeGray',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos harum, reprehenderit unde minus vitae, quod quam animi, illo laborum dignissimos sunt. Voluptate totam nihil officiis. Est et labore enim aut!',
    start_date: Date.new(2015,1,14),
    end_date: Date.new(3000,1,1)
  }
])

puts ' -- Projects -- '

Project.create([
  {
    name: "Slip 'n Slider",
    url: 'http://ventinus.github.io/slipnslider',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius vel sequi consequuntur et at. Consectetur eaque laudantium nemo soluta optio id culpa quod dolores eum, cumque quo alias vel ratione.',
    image_uid: 'https://unsplash.it/640/400',
    published: true,
    featured: true,
    featured_position: 1,
    company_id: 2
  },{
    name: 'Rotating Circle',
    url: 'http://ventinus.github.io/circle',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium earum, maiores consequuntur ducimus rerum nam adipisci id, quia, dicta corrupti, doloribus nisi ab. Ipsa labore ad voluptas, magnam consequatur explicabo.',
    image_uid: 'https://unsplash.it/640/400',
    published: true,
    featured: true,
    featured_position: 2,
    company_id: 2
  },{
    name: 'Constellation',
    url: 'http://ventinus.github.io/constellation',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut, ducimus quos porro. Recusandae deserunt sequi, dolorem quod eligendi voluptates blanditiis repellendus porro, commodi, veritatis exercitationem animi? Asperiores totam voluptas perspiciatis.',
    image_uid: 'https://unsplash.it/640/400',
    published: false,
    featured: false,
    company_id: 2
  },{
    name: 'Scene',
    url: 'http://ventinus.github.io/canvas-tree',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos totam, architecto odio magnam, esse, provident dolorem alias iusto porro sapiente quasi perspiciatis fugit! Quis totam, hic, blanditiis reprehenderit optio necessitatibus.',
    image_uid: 'https://unsplash.it/640/400',
    published: false,
    featured: false,
    company_id: 2
  }
])
