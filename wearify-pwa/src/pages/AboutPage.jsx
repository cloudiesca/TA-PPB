import Header from '../components/layout/Header';
import { Mail, Phone, MapPin, Clock, Instagram, Facebook, Twitter } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Header title="Tentang Kami" />

            <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
                {/* Hero Section */}
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-8 md:p-12 text-white mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Wearify</h1>
                    <p className="text-xl text-indigo-100 leading-relaxed">
                        Toko fashion online terpercaya dengan koleksi baju trendy dan berkualitas untuk setiap gaya Anda
                    </p>
                </div>

                {/* About Content */}
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Tentang Wearify</h2>
                    <div className="space-y-4 text-gray-600 leading-relaxed">
                        <p>
                            Wearify adalah platform e-commerce fashion yang berdedikasi untuk menyediakan
                            produk pakaian berkualitas tinggi dengan harga terjangkau. Kami percaya bahwa
                            setiap orang berhak tampil percaya diri dengan gaya mereka sendiri.
                        </p>
                        <p>
                            Dengan koleksi yang selalu update mengikuti tren terkini, kami berkomitmen
                            untuk memberikan pengalaman belanja online yang mudah, aman, dan menyenangkan.
                        </p>
                        <p>
                            Tim kami bekerja keras untuk memastikan setiap produk yang kami jual telah
                            melalui quality control ketat, sehingga Anda mendapatkan produk terbaik.
                        </p>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Hubungi Kami</h2>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="bg-indigo-100 p-3 rounded-lg">
                                <Mail className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                                <p className="text-gray-600">support@wearify.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-indigo-100 p-3 rounded-lg">
                                <Phone className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-1">Telepon</h3>
                                <p className="text-gray-600">+62 812-3456-7890</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-indigo-100 p-3 rounded-lg">
                                <MapPin className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-1">Alamat</h3>
                                <p className="text-gray-600">
                                    Jl. Pandanaran No. 123<br />
                                    Semarang, Jawa Tengah 50134
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-indigo-100 p-3 rounded-lg">
                                <Clock className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-1">Jam Operasional</h3>
                                <p className="text-gray-600">
                                    Senin - Jumat: 09.00 - 21.00 WIB<br />
                                    Sabtu - Minggu: 10.00 - 20.00 WIB
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Media */}
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Ikuti Kami</h2>
                    <div className="flex gap-4">
                        <button className="bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all">
                            <Instagram className="w-6 h-6" />
                        </button>
                        <button className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all">
                            <Facebook className="w-6 h-6" />
                        </button>
                        <button className="bg-gradient-to-br from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all">
                            <Twitter className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8 text-gray-500 text-sm">
                    <p>© 2024 Wearify. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}