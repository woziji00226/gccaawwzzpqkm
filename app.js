// 引入 Supabase 客户端库（假设通过CDN引入）
// 注意：在实际使用前，请确保在HTML中通过CDN引入了Supabase客户端库
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

// Supabase 客户端配置
// 注意：实际项目中，这些值应该从环境变量或安全的配置中获取
const supabaseUrl = 'https://zbgvfguawehgvymqcdsz.supabase.co'; // 替换为您的 Supabase 项目 URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpiZ3ZmZ3Vhd2VoZ3Z5bXFjZHN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0MDA4MDEsImV4cCI6MjA3Nzk3NjgwMX0.oMkznX0ybZEV1BiJrCUmxc1on2De5jSl1MEr_PtTe8Y'; // 替换为您的 Supabase 匿名密钥

// 初始化 Supabase 客户端
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

/**
 * 显示消息提示
 * @param {string} message - 要显示的消息
 * @param {string} type - 消息类型: 'success', 'error', 'info'
 */
function showMessage(message, type = 'info') {
    const messageElement = document.getElementById('message');
    if (!messageElement) return;

    messageElement.textContent = message;
    messageElement.classList.remove('hidden', 'bg-green-100', 'text-green-800', 'bg-red-100', 'text-red-800', 'bg-blue-100', 'text-blue-800');

    switch (type) {
        case 'success':
            messageElement.classList.add('bg-green-100', 'text-green-800');
            break;
        case 'error':
            messageElement.classList.add('bg-red-100', 'text-red-800');
            break;
        case 'info':
        default:
            messageElement.classList.add('bg-blue-100', 'text-blue-800');
    }

    // 5秒后自动隐藏消息
    setTimeout(() => {
        messageElement.classList.add('hidden');
    }, 5000);
}

/**
 * 重新发送验证邮件
 * @param {string} email - 用户邮箱
 * @returns {Promise}
 */
async function resendVerificationEmail(email) {
    try {
        const { error } = await supabase.auth.resend({ email, type: 'signup' });
        
        if (error) {
            showMessage('重新发送验证邮件失败: ' + error.message, 'error');
            throw error;
        }
        
        showMessage('验证邮件已重新发送，请检查您的邮箱。', 'info');
    } catch (error) {
        console.error('重新发送验证邮件失败:', error);
        throw error;
    }
}

/**
 * 用户登录
 * @param {string} email - 用户邮箱
 * @param {string} password - 用户密码
 * @param {boolean} rememberMe - 是否记住用户
 * @returns {Promise}
 */
async function loginUser(email, password, rememberMe = false) {
    try {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            // 检查是否是邮箱未验证错误
            if (error.message === 'Email not confirmed' || error.message.includes('email') && error.message.includes('confirm')) {
                showMessage('您的邮箱尚未验证，正在为您重新发送验证邮件...', 'info');
                // 自动重新发送验证邮件
                await resendVerificationEmail(email);
            } else {
                showMessage(error.message, 'error');
            }
            throw error;
        }

        showMessage('登录成功！', 'success');

        // 可以在这里重定向到受保护的页面
        setTimeout(() => {
            // 例如: window.location.href = 'dashboard.html';
            alert('登录成功！您可以在这里添加重定向到仪表盘的逻辑。');
        }, 1000);
    } catch (error) {
        console.error('登录失败:', error);
        throw error;
    }
}

/**
 * 用户注册
 * @param {string} email - 用户邮箱
 * @param {string} password - 用户密码
 * @param {object} metadata - 可选的用户元数据
 * @returns {Promise}
 */
async function registerUser(email, password, metadata = {}) {
    try {
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: metadata
                /*
                emailRedirectTo: window.location.origin + '/verify-email.html'
                */
            }
        });

        if (error) {
            showMessage(error.message, 'error');
            throw error;
        }

        showMessage('注册成功！请检查您的邮箱进行验证。', 'success');

        // 注册成功后跳转到登录页面
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    } catch (error) {
        console.error('注册失败:', error);
        throw error;
    }
}

/**
 * 重置密码请求
 * @param {string} email - 用户邮箱
 * @returns {Promise}
 */
async function resetPassword(email) {
    try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            /*
            redirectTo: window.location.origin + '/reset-password.html'
            */
        });

        if (error) {
            showMessage(error.message, 'error');
            throw error;
        }

        showMessage('重置链接已发送到您的邮箱！', 'success');
    } catch (error) {
        console.error('重置密码请求失败:', error);
        throw error;
    }
}

/**
 * 更新密码
 * @param {string} tokenHash - 重置令牌哈希
 * @param {string} newPassword - 新密码
 * @returns {Promise}
 */
async function updatePassword(tokenHash, newPassword) {
    try {
        const { error } = await supabase.auth.updateUser({
            password: newPassword
        });

        if (error) {
            showMessage(error.message, 'error');
            throw error;
        }

        showMessage('密码更新成功！', 'success');
    } catch (error) {
        console.error('更新密码失败:', error);
        throw error;
    }
}

/**
 * 验证邮箱
 * @param {string} tokenHash - 验证令牌哈希
 * @returns {Promise}
 */
// 根据需求，我们不需要verifyEmail函数
// 只需检查URL中是否存在token或access_token参数即可判断验证是否成功

/**
 * 社交登录
 * @param {string} provider - 提供商: 'google', 'github', 'twitter'
 */
function socialLogin(provider) {
    supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: window.location.origin + '/verify-email.html'
        }
    });
}

/**
 * 用户登出
 * @returns {Promise}
 */
async function logoutUser() {
    try {
        const { error } = await supabase.auth.signOut();

        if (error) {
            showMessage(error.message, 'error');
            throw error;
        }

        // 登出后重定向到登录页面
        window.location.href = 'login.html';
    } catch (error) {
        console.error('登出失败:', error);
        throw error;
    }
}

/**
 * 检查用户认证状态
 * @returns {Promise<Object|null>} - 返回用户信息或 null
 */
async function checkAuthStatus() {
    try {
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error) {
            console.error('检查认证状态失败:', error);
            return null;
        }

        return user;
    } catch (error) {
        console.error('检查认证状态时出错:', error);
        return null;
    }
}

// 监听认证状态变化
supabase.auth.onAuthStateChange((event, session) => {
    console.log('认证状态变化:', event, session);
    // 可以在这里处理认证状态变化，例如更新UI、重定向等
});

// 导出函数供其他模块使用（如果需要）
window.authUtils = {
    loginUser,
    registerUser,
    resetPassword,
    updatePassword,
    resendVerificationEmail,
    socialLogin,
    logoutUser,
    checkAuthStatus,
    showMessage
};

// 开发环境提示
if (supabaseUrl === 'YOUR_SUPABASE_URL' || supabaseKey === 'YOUR_SUPABASE_ANON_KEY') {
    console.warn('⚠️ 请在 app.js 中配置您的 Supabase URL 和匿名密钥以使用认证功能。');
}