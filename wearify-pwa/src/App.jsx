import { useState } from 'react';
import BottomNav from './components/layout/BottomNav.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import CategoriesListPage from './pages/CategoriesListPage.jsx';  // GANTI INI
import CategoryProductsPage from './pages/CategoryProductsPage.jsx';  // GANTI INI
import AboutPage from './pages/AboutPage.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setSelectedProductId(null);
    setSelectedCategoryId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToProductDetail = (productId) => {
    setSelectedProductId(productId);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToCategoryDetail = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setCurrentPage('category-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (currentPage === 'product-detail') {
      setCurrentPage('products');
      setSelectedProductId(null);
    } else if (currentPage === 'category-detail') {
      setCurrentPage('categories');
      setSelectedCategoryId(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigateToDetail={handleNavigateToProductDetail} />;
      case 'products':
        return <ProductsPage onNavigateToDetail={handleNavigateToProductDetail} />;
      case 'product-detail':
        return (
          <ProductDetailPage
            productId={selectedProductId}
            onBack={handleBack}
          />
        );
      case 'categories':
        return <CategoriesListPage onNavigateToCategoryDetail={handleNavigateToCategoryDetail} />;
      case 'category-detail':
        return (
          <CategoryProductsPage
            categoryId={selectedCategoryId}
            onBack={handleBack}
            onNavigateToProduct={handleNavigateToProductDetail}
          />
        );
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage onNavigateToDetail={handleNavigateToProductDetail} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderPage()}
      <BottomNav currentPage={currentPage} onNavigate={handleNavigate} />
    </div>
  );
}

export default App;