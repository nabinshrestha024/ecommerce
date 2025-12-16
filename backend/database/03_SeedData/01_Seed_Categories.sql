USE [EcommerceDB];
GO

PRINT 'Seeding catalog.Categories...';

DELETE FROM catalog.Categories;
DBCC CHECKIDENT ('catalog.Categories', RESEED, 0);

-- Parent categories
INSERT INTO catalog.Categories
(
    ParentCategoryId,
    Name,
    Slug,
    Description,
    IsFeatured,
    DisplayOrder,
    SortOrder
)
VALUES
(NULL, 'Accessories',      'accessories',      'Fashion accessories', 0, 1, 1),
(NULL, 'Books',            'books',            'Books & literature',  0, 2, 2),
(NULL, 'Electronics',      'electronics',      'Electronic devices',  1, 3, 3),
(NULL, 'Fashion',          'fashion',          'Clothing & fashion',  1, 4, 4),
(NULL, 'Home & Kitchen',   'home-kitchen',     'Home appliances',     1, 5, 5),
(NULL, 'Sports',           'sports',           'Sports products',     0, 6, 6),
(NULL, 'Toys & Games',     'toys-games',       'Toys and games',      0, 7, 7),
(NULL, 'Health & Fitness', 'health-fitness',   'Fitness products',    1, 8, 8);

-- Electronics subcategories
INSERT INTO catalog.Categories
(
    ParentCategoryId,
    Name,
    Slug,
    Description,
    DisplayOrder,
    SortOrder
)
SELECT
    c.CategoryId,
    v.Name,
    v.Slug,
    v.Description,
    v.DisplayOrder,
    v.SortOrder
FROM catalog.Categories c
JOIN (VALUES
    ('Laptops',     'electronics-laptops',     'All kinds of laptops',      1, 1),
    ('Mobiles',     'electronics-mobiles',     'Smartphones and mobiles',   2, 2),
    ('Tablets',     'electronics-tablets',     'Tablets and iPads',         3, 3),
    ('Accessories', 'electronics-accessories', 'Electronic accessories',   4, 4)
) v(Name, Slug, Description, DisplayOrder, SortOrder)
ON c.Name = 'Electronics';

-- Sports subcategories
INSERT INTO catalog.Categories
(
    ParentCategoryId,
    Name,
    Slug,
    Description,
    DisplayOrder,
    SortOrder
)
SELECT
    c.CategoryId,
    v.Name,
    v.Slug,
    v.Description,
    v.DisplayOrder,
    v.SortOrder
FROM catalog.Categories c
JOIN (VALUES
    ('Indoor Sports',  'sports-indoor',  'Indoor sports equipment',  1, 1),
    ('Outdoor Sports', 'sports-outdoor', 'Outdoor sports equipment', 2, 2)
) v(Name, Slug, Description, DisplayOrder, SortOrder)
ON c.Name = 'Sports';

PRINT 'catalog.Categories seeded successfully.';
